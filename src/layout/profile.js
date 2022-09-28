import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function Profile({ data }) {
  const { name, address, phone, email, avatar } = data;
  return (
    <div className="h-screen">
      <div className="bg-sky-600 h-24 p-2">
        <div className="flex justify-center">
          <img src={avatar ?? ""} alt={name} className="rounded-full" />
        </div>
        <div className="flex flex-row justify-between mb-5">
          <p className="text-3xl font-semibold text-sky-800 uppercase">
            {name}
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <MapPinIcon className="w-5 fill-sky-700" />
          <p>{address}</p>
        </div>

        <div className="flex flex-row space-x-2">
          <PhoneIcon className="w-5 fill-sky-700" />
          <p>{phone}</p>
        </div>
        <div className="flex flex-row space-x-2">
          <EnvelopeIcon className="w-5 fill-sky-700" />
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
}
