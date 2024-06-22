const provinceApiRoot = `https://vapi.vnappmob.com/api`;

const getProvinces = async () => {
    try {
        const response = await fetch(`${provinceApiRoot}/province`);

        const result = await response.json();
        const data = result.results;

        return data;
    } catch (error) {
        console.log(error);
    }
};

const getDistricts = async (provinceId) => {
    try {
        const response = await fetch(
            `${provinceApiRoot}/province/district/${provinceId}`
        );

        const result = await response.json();
        const data = result.results;

        return data;
    } catch (error) {
        console.log(error);
    }
};

const getWards = async (districtId) => {
    try {
        const response = await fetch(
            `${provinceApiRoot}/province/ward/${districtId}`
        );

        const result = await response.json();
        const data = result.results;

        return data;
    } catch (error) {
        console.log(error);
    }
};

export { getProvinces, getDistricts, getWards };
