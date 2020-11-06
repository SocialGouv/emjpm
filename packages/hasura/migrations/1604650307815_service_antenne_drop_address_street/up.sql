update service_antenne set address = address_street where address is null and longitude is not null and latitude is not null;

alter table service_antenne drop column address_street;
