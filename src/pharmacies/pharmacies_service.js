const pharmacyDao = require('./pharmacies_dao');

exports.createPharmacy = (pharmacyDto) => {
    // TODO: validate object
    let dto = {
        pharmacy_name: pharmacyDto.pharmacy_name,
        branch: pharmacyDto.branch,
        logo: pharmacyDto.logo,
        phone_number: pharmacyDto.phone_number,
        whatsapp_number: pharmacyDto.whatsapp_number
    };

    return pharmacyDao.create(dto);
};

exports.getPharmacies = (pageSize = 10, pageNumber = 0) => {
    return pharmacyDao.getAll(pageSize, pageNumber);
};

exports.getTotal = async () => {
    let total = await pharmacyDao.getTotal();
    return {total: total};
};
