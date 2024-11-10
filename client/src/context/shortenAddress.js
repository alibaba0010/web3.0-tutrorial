// function to shotren the address
function shortenAddress(address) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}
export default shortenAddress;
