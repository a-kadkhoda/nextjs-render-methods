const Handler = (req, res) => {
  res.revalidate("/products");
  res.send("SUCCESSFULY REVALIDATE!!!");
};
export default Handler