const { Sequelize, DataTypes } = require("sequelize");
// Stopgap to make env-vars available since this file is not imported directly into app.js
require("dotenv").config();

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/repitnyc`
); 

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const Office = sequelize.define("office", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING
  }
});

const seed = () => {
  // should this be cleaned up ?
  Office.findAll().then((res) => {
    console.log(
      res.map((office) => {
        return { title: office.title, description: office.description };
      })
    );
  });
  Office.create({
    title: "Manhattan Borough President",
    description:
      "A borough president is an elected public official responsible for oversight of a borough. Borough presidents are responsible for making budget recommendations to the mayor of New York, proposing legislation in the New York City Council, appointing borough representatives to commissions and boards, and holding public hearings on borough issues. Source: https:ballotpedia.org/Borough_president "
  });
  Office.create({
    title: "Brooklyn Borough President",
    description:
      "A borough president is an elected public official responsible for oversight of a borough. Borough presidents are responsible for making budget recommendations to the mayor of New York, proposing legislation in the New York City Council, appointing borough representatives to commissions and boards, and holding public hearings on borough issues. Source: https:ballotpedia.org/Borough_president "
  });
  Office.create({
    title: "Bronx Borough President",
    description:
      "A borough president is an elected public official responsible for oversight of a borough. Borough presidents are responsible for making budget recommendations to the mayor of New York, proposing legislation in the New York City Council, appointing borough representatives to commissions and boards, and holding public hearings on borough issues. Source: https:ballotpedia.org/Borough_president "
  });
  Office.create({
    title: "Queens Borough President",
    description:
      "A borough president is an elected public official responsible for oversight of a borough. Borough presidents are responsible for making budget recommendations to the mayor of New York, proposing legislation in the New York City Council, appointing borough representatives to commissions and boards, and holding public hearings on borough issues. Source: https:ballotpedia.org/Borough_president "
  });
  Office.create({
    title: "Staten Island Borough President",
    description:
      "A borough president is an elected public official responsible for oversight of a borough. Borough presidents are responsible for making budget recommendations to the mayor of New York, proposing legislation in the New York City Council, appointing borough representatives to commissions and boards, and holding public hearings on borough issues. Source: https:ballotpedia.org/Borough_president "
  });
  Office.create({
    title: "Manhattan District Attorney",
    description:
      "A district attorney is an elected official responsible for prosecuting crimes that occur within their jurisdiction. These officials have the power to conduct a grand jury investigation, decide whether to prosecute an offender, and offer plea bargains. Source: https:ballotpedia.org/District_attorney"
  });
  Office.create({
    title: "Brooklyn District Attorney",
    description:
      "A district attorney is an elected official responsible for prosecuting crimes that occur within their jurisdiction. These officials have the power to conduct a grand jury investigation, decide whether to prosecute an offender, and offer plea bargains. Source: https:ballotpedia.org/District_attorney"
  });
  Office.create({
    title: "Bronx District Attorney",
    description:
      "A district attorney is an elected official responsible for prosecuting crimes that occur within their jurisdiction. These officials have the power to conduct a grand jury investigation, decide whether to prosecute an offender, and offer plea bargains. Source: https:ballotpedia.org/District_attorney"
  });
  Office.create({
    title: "Queens District Attorney",
    description:
      "A district attorney is an elected official responsible for prosecuting crimes that occur within their jurisdiction. These officials have the power to conduct a grand jury investigation, decide whether to prosecute an offender, and offer plea bargains. Source: https:ballotpedia.org/District_attorney"
  });
  Office.create({
    title: "Staten Island District Attorney",
    description:
      "A district attorney is an elected official responsible for prosecuting crimes that occur within their jurisdiction. These officials have the power to conduct a grand jury investigation, decide whether to prosecute an offender, and offer plea bargains. Source: https:ballotpedia.org/District_attorney"
  });
  Office.create({
    title: "Mayor of New York",
    description:
      "The Mayor of the City of New York is the head of the executive branch of the government of New York City and the chief executive of New York City. The mayor's office administers all city services, public property, police and fire protection, most public agencies, and enforces all city and state laws within New York City. The budget, overseen by New York City Mayor's Office of Management and Budget, is the largest municipal budget in the United States, totaling $100.7 billion in fiscal year 2021.[1] The City employs 325,000 people, spends about $21 billion to educate more than 1.1 million students (the largest public school system in the United States), and levies $27 billion in taxes. It receives $14 billion from the state and federal governments. Source: https:en.wikipedia.org/wiki/Mayor_of_New_York_City"
  });
  Office.create({
    title: "New York Public Advocate",
    description:
      "The Public Advocate is a non-voting member of the New York City Council with the right to introduce and co-sponsor legislation. Prior to a 2002 charter revision, the Public Advocate was also the presiding officer of the Council. The Public Advocate also serves as an ombudsman for city government, providing oversight for city agencies, investigating citizens' complaints about city services and making proposals to address perceived shortcomings or failures of those services. These duties, worded somewhat ambiguously, are laid out in Section 24 of the City Charter. The Public Advocate serves on the committee which selects the director of the New York City Independent Budget Office and appoints members to several boards and commissions, including one member of the New York City Planning Commission. The Public Advocate also serves as chair of the Commission of Public Information and Communication established by Section 1061 of the New York City Charter. Along with the Mayor and the Comptroller, the Public Advocate is one of three municipal offices elected by all the city's voters. In the event of a vacancy or incapacity of the mayor, the Public Advocate is first in line to become Mayor. Source: https:pubadvocate.nyc.gov/about#duties-of-the-office/"
  });
  Office.create({
    title: "New York City Comptroller",
    description:
      "The Bureau of Accountancy is responsible for all aspects of the City’s financial accounting and reporting. It prepares the Comptroller’s Annual Comprehensive Financial Report (ACFR), which contains the City’s Charter-mandated audited financial statements and its layperson-friendly companion, the Popular Annual Financial Report (PAFR). The Bureau is primarily responsible for the design and management of the City’s centralized accounting, internal control and budgeting system,and the Financial Management System (FMS). The Bureau is also responsible for ensuring accuracy in City agency accounting, reconciliation of more than 100 City bank accounts, investment accounting for the City’s five main pension plans and eleven variable supplement funds (VSFs), servicing the City’s general obligation debt, and approving vendor information in FMS. The Bureau of Accountancy also has primary responsibility for issuing and updating Comptroller’s Directives and Memoranda, which dictate a wide range of accounting and internal control procedures for all City agencies and related entities. Source: https:comptroller.nyc.gov/about/overview-of-the-office/"
  });
  Office.create({
    title: "New York City Council Member",
    description:
      "The City Council introduces and votes on legislation (proposed laws) having to do with all aspects of City life; Negotiates the City’s budget with the Mayor and approves its adoption; Monitors City agencies such as the Department of Education and the NYPD to make sure they’re effectively serving New Yorkers. Reviews land use and makes decisions about the growth and development of our city. The City Council is similar to Congress at the federal level, it is New York City’s legislative body. The Council is separate from the Mayor’s administration but an equal partner in how New York is run. Source: https:council.nyc.gov/about/"
  });
  console.log(Office.findAll().then((r) => console.log(r)));
};



sequelize
  .sync()
  .then(() => {})
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = { Office, User, sequelize };
