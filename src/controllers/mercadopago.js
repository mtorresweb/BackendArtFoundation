const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const checkout = async (req, res) => {
  const student = req.body;

  const preference = {
    items: [
      {
        title: "Donacion",
        unit_price: 10000,
        quantity: 1,
        currency_id: "COP",
        description: "Donacion para el aprendizaje de " + student.name,
      },
    ],
  };

  const response = await mercadopago.preferences.create(preference);
  res.status(200).send({
    status: "success",
    url: response.body.init_point,
  });
};

module.exports = { checkout };
