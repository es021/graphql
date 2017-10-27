class CompanyQuery {
    constructor() {
        this.TB = "companies";
        this.ID = "ID";
        this.TYPE = "TYPE";
        
        this.TYPE_GOLD = 1;
        this.TYPE_SILVER = 2;
        this.TYPE_BRONZE = 3;
        this.TYPE_NORMAL = 4;
    }

    getById(id) {
        return `select * from ${this.TB} where ${this.ID} = ${id}`;
    }

    getAll(type) {
        type = (typeof type === "undefined") ? "%" : type;
        return `select * from ${this.TB} where ${this.TYPE} LIKE '%${type}%'`;
    }
}

module.exports = new CompanyQuery();


