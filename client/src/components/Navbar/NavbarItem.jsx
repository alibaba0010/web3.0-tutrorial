import PropTypes from "prop-types";

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

NavbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  classProps: PropTypes.string.isRequired,
};
export default NavbarItem;
