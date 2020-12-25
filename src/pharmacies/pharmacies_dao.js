const models = require('../../models');
const Pharmacy = models.pharmacies;

exports.create = async (dto) => {
    let result = await Pharmacy.create(dto);
    if (result)
        result = result.toJSON();
    return result;
};

exports.getAll = async (pageSize, pageNumber) => {
    pageSize = Number(pageSize);
    pageNumber = Number(pageNumber);

    let results = await Pharmacy.findAll({
        offset: pageSize * pageNumber,
        limit: pageSize,
        order: [['id', 'DESC']]
    });

    results = results.map(p => p.toJSON());
    return results;
};