import React from "react";
const StateLiftingCard = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {" "}
      {/* Header */}{" "}
      <div className="mb-5">
        {" "}
        <h2 className="text-2xl font-bold text-gray-900">
          {" "}
          State Lifting Up{" "}
        </h2>{" "}
        <p className="text-gray-500 text-sm mt-1">
          {" "}
          Sharing state between sibling components{" "}
        </p>{" "}
      </div>{" "}
      {/* Parent */}{" "}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
        {" "}
        <h3 className="font-semibold text-blue-700">Parent Component</h3>{" "}
        <p className="text-sm text-gray-600 mt-1"> Owns the state </p>{" "}
        <div className="mt-3 bg-white border border-blue-200 rounded-lg p-2 text-sm font-mono">
          {" "}
          const [name, setName] = useState("");{" "}
        </div>{" "}
      </div>{" "}
      {/* Arrow */}{" "}
      <div className="flex justify-center my-3">
        {" "}
        <span className="text-gray-400 text-xl">↓</span>{" "}
      </div>{" "}
      {/* Children */}{" "}
      <div className="grid grid-cols-2 gap-3">
        {" "}
        {/* Child A */}{" "}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          {" "}
          <h3 className="font-semibold text-green-700"> Child A </h3>{" "}
          <p className="text-sm text-gray-600 mt-1"> Changes state </p>{" "}
          <div className="mt-3 bg-white border border-green-200 rounded-lg p-2 text-xs font-mono">
            {" "}
            setName(){" "}
          </div>{" "}
        </div>{" "}
        {/* Child B */}{" "}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          {" "}
          <h3 className="font-semibold text-purple-700"> Child B </h3>{" "}
          <p className="text-sm text-gray-600 mt-1"> Uses state </p>{" "}
          <div className="mt-3 bg-white border border-purple-200 rounded-lg p-2 text-xs font-mono">
            {" "}
            name{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Explanation */}{" "}
      <div className="mt-5 bg-gray-50 rounded-xl p-4 border border-gray-200">
        {" "}
        <p className="text-sm text-gray-700 leading-relaxed">
          {" "}
          <span className="font-semibold text-gray-900">
            {" "}
            State Lifting Up:{" "}
          </span>{" "}
          Move state to the closest common parent so multiple child components
          can share and update the same data.{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};
export default StateLiftingCard;
