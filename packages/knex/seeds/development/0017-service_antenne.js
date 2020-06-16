exports.seed = async function (knex) {
  await knex("service_antenne").del();
  const services = await knex("services");
  return Promise.all(
    services.map((service) =>
      knex("service_antenne").insert({
        service_id: service.id,
        name: "skynet antenne",
        contact_firstname: "sarah",
        contact_lastname: "connor",
        contact_email: "sarahconnor@gmail.com",
        contact_phone: "0683965877",
        address_street: "1 rue des chats",
        address_zip_code: "75017",
        address_city: "paris",
        mesures_max: 300,
      })
    )
  );
};
