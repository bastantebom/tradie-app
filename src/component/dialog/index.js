import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { statuses } from "../../utils";
import { Oval } from "react-loader-spinner";

export function Modal({ data, isOpen, setIsOpen, handleUpdate, isLoading }) {
  const newStatus = useRef();

  const onChangeStatus = (event) => {
    newStatus.current = event.target.value;
  };

  const onHandlePressUpdate = () => {
    handleUpdate(newStatus.current, data);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {`Update status of ${data.title}`}
              </Dialog.Title>

              <div className="mt-2 h-24">
                <p className="text-sm text-gray-500 border-t pt-2 text-center">
                  <select
                    onChange={onChangeStatus}
                    className="bg-stone-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Status</option>
                    {statuses
                      .filter((s) => s.id !== data.status)
                      .map((status) => {
                        return <option key={status.id}>{status.value}</option>;
                      })}
                  </select>
                </p>
              </div>

              <div className="flex flex-row justify-around mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-white bg-green-400 border border-transparent rounded-md hover:bg-green-200 duration-300"
                  onClick={onHandlePressUpdate}
                >
                  {isLoading ? (
                    <Oval
                      height={25}
                      width={25}
                      color="#fff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
