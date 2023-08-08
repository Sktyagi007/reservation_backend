const pool = require("../config");

exports.dataController = async (req, res) => {
  console.log(req);
  const q1 = {
    companyName: req.body.companyName,
  };
  console.log(q1);

  try {
    // let q2 = `Select * from MstCorporate where company='${q1.companyName}'`;
    let q2 = `SELECT * FROM MstCorporate WHERE company LIKE '%${q1.companyName}%'`;
    const result2 = await pool.query(q2);
    console.log(result2);
    const companyAddress = result2.recordset[0].Address;
    let q3 = `Select * from MstBranch where BranchID=${result2.recordset[0].BranchID}`;
    const result3 = await pool.query(q3);
    const companyBranch = result3.recordset[0].BranchName;
    res.status(200).json({
      companyAdd: companyAddress,
      companyBranch: companyBranch,
    });

  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.cityController = async (req, res) => {
  try {
    let query = "select CityName from MstCity where IsActive = 1";
    const result = await pool.query(query);
    // console.log(result.recordset);
    const cityArray = result.recordset.map((city) => city.CityName);
    // console.log(cityArray);
    res.status(200).json({
      cities: cityArray,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.carTypeController = async (req, res) => {
  try {
    let query = "select CarType from LkpCarType where IsActive = 1";
    const result = await pool.query(query);
    // console.log(result.recordset);
    const carsArray = result.recordset.map(cars=>cars.CarType);
    res.status(200).json({
      cars: carsArray,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.paymentModeController = async (req, res) => {
  try {
    let query = "select Mode from LkpPayMode where isActive = 1";
    const result = await pool.query(query);
    // console.log(result.recordset);
    const paymentsArray = result.recordset.map(modes=>modes.Mode);
    res.status(200).json({
      payments: paymentsArray,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
    console.log(error);
  }
};


exports.getAllCorporateData = async (req,res)=>{
  const q1 = {
    companyName: req.body.companyName,
    bookerName: req.body.bookerName,
  };

  try {
    let query = `select * from MstCorporate where Company Like '%${q1.companyName}%' and SpocName Like '%${q1.bookerName}%' and IsActive = 1`;
    const result = await pool.query(query);
    // console.log(result);
    const entityArray = result.recordset.map(modes=>modes.Company);
    const branchIDArray = result.recordset.map(modes=>modes.BranchID);
    let branchArray = [];
    for(let i = 0; i<branchIDArray.length; i++){
      let query1 = `select * from MstBranch where BranchID=${branchIDArray[i]}`
      let result1 = await pool.query(query1);

      branchArray.push(result1.recordset[0].BranchName)
    }

    // let query2 = "select CarType from LkpCarType where IsActive = 1";
    // const result1 = await pool.query(query2);
    // const carsArray = result1.recordset.map(cars=>cars.CarType);

    res.status(200).json({
      entityArray:entityArray,
      branchArray:branchArray,
      // carsArray:carsArray

    })

  } catch (error) {
    res.status(400).json({
      error: error,
    });
    console.log(error);
  }
}
