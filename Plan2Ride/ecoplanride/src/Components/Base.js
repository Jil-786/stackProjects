import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Base.css";

const Base = () => {
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handlePlanRoute = () => {
    if (!startPoint || !destination) {
      setShowModal(true);
      return;
    }
    // Navigate to the OSMMap component with startPoint and destination
    navigate(`/home?start=${encodeURIComponent(startPoint)}&destination=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      {/* Hero Section */}
      <div className="tw-relative tw-h-[600px] tw-overflow-hidden">
        <div
          className="tw-absolute tw-inset-0 tw-bg-cover tw-bg-center"
          style={{
            backgroundImage:
              "url(https://ideogram.ai/assets/progressive-image/balanced/response/1enQYEdnSiSc3V-pHNu7uA)",
          }}
        >
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-gray-900/90 tw-to-transparent">
            <div className="tw-container tw-mx-auto tw-px-6 tw-h-full tw-flex tw-items-center">
              <div className="tw-max-w-2xl tw-text-white">
                <h1 className="tw-text-6xl tw-font-bold tw-mb-6">
                  Ready to Plan Your Next Epic Bike Trip?
                </h1>
                <p className="tw-text-xl tw-mb-8">
                  Discover the perfect route, amazing stops, and unforgettable
                  experiences for your motorcycle adventure.
                </p>
                <button
                  onClick={() =>
                    document
                      .getElementById("planner")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="tw-bg-white tw-text-gray-900 tw-px-8 tw-py-4 tw-text-lg tw-font-semibold tw-rounded-lg tw-hover:bg-gray-100 tw-transition-colors tw-cursor-pointer tw-whitespace-nowrap"
                >
                  Start Planning Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="planner" className="tw-container tw-mx-auto tw-px-6 tw-py-16">
        {/* Input Section */}
        <div className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-8 tw-mb-16">
          <h2 className="tw-text-3xl tw-font-semibold tw-mb-8 tw-text-center">
            Plan Your Journey
          </h2>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-8">
            <div className="tw-relative">
              <input
                type="text"
                placeholder="Enter Starting Point"
                className="tw-w-full tw-pl-4 tw-pr-4 tw-py-4 tw-border tw-border-gray-200 tw-rounded-lg focus:tw-outline-none focus:tw-border-blue-500"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
              />
            </div>
            <div className="tw-relative">
              <input
                type="text"
                placeholder="Enter Destination"
                className="tw-w-full tw-pl-4 tw-pr-4 tw-py-4 tw-border tw-border-gray-200 tw-rounded-lg focus:tw-outline-none focus:tw-border-blue-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>
          <div className="tw-text-center">
            <button
              onClick={handlePlanRoute}
              className="tw-bg-blue-600 tw-text-white tw-px-8 tw-py-4 tw-text-lg tw-font-semibold tw-rounded-lg hover:tw-bg-blue-700 tw-transition-colors tw-cursor-pointer"
            >
              Plan My Route
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8 tw-mb-16">
          {[
            {
              title: "Must-visit Places",
              description:
                "Discover hidden gems and iconic landmarks along your journey",
              image:
                "https://ideogram.ai/assets/progressive-image/balanced/response/FYHixvgcRhS_5MTVZGQk_Q",
            },
            {
              title: "Best Food & Rest Stops",
              description: "Find perfect pit stops for meals and breaks",
              image:
                "https://ideogram.ai/assets/image/lossless/response/lBGuOwfmSsajnXFHNE1ZzA",
            },
            {
              title: "Fuel Consumption",
              description: "Estimate your fuel needs and plan refueling stops",
              image:
                "https://ideogram.ai/assets/progressive-image/balanced/response/LsPzQIofTeimZQL6YFITtQ",
            },
            {
              title: "Travel Time Calculator",
              description: "Get accurate time estimates for your journey",
              image:
                "https://ideogram.ai/assets/progressive-image/balanced/response/SIYxYzvsRZSbQqX6G2cdrQ",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-overflow-hidden tw-transition-transform hover:tw--translate-y-1"
            >
              <div className="tw-h-48 tw-relative tw-overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="tw-w-full tw-h-full tw-object-cover"
                />
              </div>
              <div className="tw-p-6">
                <h3 className="tw-text-xl tw-font-semibold tw-mb-2">
                  {feature.title}
                </h3>
                <p className="tw-text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="tw-bg-blue-600 tw-rounded-xl tw-text-white tw-p-12 tw-text-center">
          <h2 className="tw-text-4xl tw-font-bold tw-mb-6">Let's Get Rolling!</h2>
          <p className="tw-text-xl tw-mb-8">
            Your next great adventure is just a few clicks away.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("planner")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="tw-bg-white tw-text-blue-600 tw-px-8 tw-py-4 tw-text-lg tw-font-semibold tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors tw-cursor-pointer"
          >
            Start Planning Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-bg-white tw-rounded-xl tw-p-8 tw-max-w-md tw-w-full tw-mx-4">
            <h3 className="tw-text-2xl tw-font-semibold tw-mb-4">
              Please Fill All Fields
            </h3>
            <p className="tw-text-gray-600 tw-mb-6">
              Both starting point and destination are required to plan your route.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-w-full tw-font-semibold"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Base;