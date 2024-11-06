import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

import { getAllDatabases } from "./controllers/TestController";
import { deleteSingleSalesEmployee, getAllSalesEmployees, getCreateSingleSalesEmployee, getSingleSalesEmployee, getSingleSalesEmployeeToDelete, getSingleSalesEmployeeToEdit, postCreateSingleSalesEmployee, postEditSingleSalesEmployee } from "./controllers/SalesEmployeeController";
import { percentageFilter } from "./filter/PercentageFilter";
import { currencyFilter } from "./filter/CurrencyFilter";

const app = express();

const env = nunjucks.configure([
  "node_modules/govuk-frontend/dist",
  "views"
], {
    autoescape: true,
    express: app
});

env.addFilter('percentage', percentageFilter);
env.addFilter('currency', currencyFilter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('node_modules/govuk-frontend/dist/govuk/'));
app.use(express.static('node_modules/govuk-frontend/dist/govuk/assets'));

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/', getAllDatabases);

app.get('/sales-employees', getAllSalesEmployees);
app.get('/sales-employees/create', getCreateSingleSalesEmployee);
app.post('/sales-employees/create', postCreateSingleSalesEmployee);
app.get('/sales-employees/:id', getSingleSalesEmployee);
app.get('/sales-employees/delete/:id', getSingleSalesEmployeeToDelete);
app.post('/sales-employees/delete/:id', deleteSingleSalesEmployee);
app.get('/sales-employees/edit/:id', getSingleSalesEmployeeToEdit);
app.post('/sales-employees/edit/:id', postEditSingleSalesEmployee);