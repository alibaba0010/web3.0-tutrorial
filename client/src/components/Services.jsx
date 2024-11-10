import React from "react";
import PropTypes from "prop-types";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

function Services() {
  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center"></div>
    </div>
  );
}

Services.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
};

export default Services;
