import { Dialog } from "@headlessui/react";

export default function Drawer({ children, isOpen, setIsOpen }) {
  return (
    <Dialog
      unmount={false}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-30 inset-0 overflow-y-auto"
    >
      <div className="flex w-3/4 h-screen">
        <Dialog.Overlay className="z-40 fixed inset-0 bg-black bg-opacity-40" />
        <div
          className={`z-50 flex flex-col justify-between bg-gray-100 w-full
                         max-w-sm p-6 overflow-hidden text-left align-middle
                         shadow-xl`}
        >
          <div className="overflow-scroll">{children}</div>
          <div className="self-center mt-10">
            <p onClick={() => setIsOpen(!isOpen)}>Close</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
