import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

import { percentageFilter } from "./filter/PercentageFilter";
import { currencyFilter } from "./filter/CurrencyFilter";
import { getSalesEmployeeCreateForm, getSalesEmployeeDeleteForm, getSalesEmployeeDetail, getSalesEmployeeEditForm, getSalesEmployeeList, postSalesEmployeeCreateForm, postSalesEmployeeDeleteForm, postSalesEmployeeEditForm } from "./controllers/SalesEmployeeController";
import { checkSalesEmployeeExists } from "./middleware/CheckSalesEmployeeExistsMiddleware";

import { getDeliveryEmployeeCreateForm, getDeliveryEmployeeDeleteForm, getDeliveryEmployeeDetail, getDeliveryEmployeeEditForm, getDeliveryEmployeeList, postDeliveryEmployeeCreateForm, postDeliveryEmployeeDeleteForm, postDeliveryEmployeeEditForm } from "./controllers/DeliveryEmployeeController";
import { checkDeliveryEmployeeExists } from "./middleware/CheckDeliveryEmployeeExistsMiddleware";
const app = express();

const env = nunjucks.configure([
  'node_modules/govuk-frontend/dist',
  'views'
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

app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/sales-employees', getSalesEmployeeList);
app.get('/sales-employees/create', getSalesEmployeeCreateForm);
app.post('/sales-employees/create', postSalesEmployeeCreateForm);
app.get('/sales-employees/:id', checkSalesEmployeeExists(), getSalesEmployeeDetail);
app.get('/sales-employees/delete/:id', checkSalesEmployeeExists(), getSalesEmployeeDeleteForm);
app.post('/sales-employees/delete/:id', checkSalesEmployeeExists(), postSalesEmployeeDeleteForm);
app.get('/sales-employees/edit/:id', checkSalesEmployeeExists(), getSalesEmployeeEditForm);
app.post('/sales-employees/edit/:id', checkSalesEmployeeExists(), postSalesEmployeeEditForm);


app.get('/delivery-employees', getDeliveryEmployeeList);
app.get('/delivery-employees/create', getDeliveryEmployeeCreateForm);
app.post('/delivery-employees/create', postDeliveryEmployeeCreateForm);
app.get('/delivery-employees/:id', checkDeliveryEmployeeExists(), getDeliveryEmployeeDetail);
app.get('/delivery-employees/delete/:id', checkDeliveryEmployeeExists(), getDeliveryEmployeeDeleteForm);
app.post('/delivery-employees/delete/:id', checkDeliveryEmployeeExists(), postDeliveryEmployeeDeleteForm);
app.get('/delivery-employees/edit/:id', checkDeliveryEmployeeExists(), getDeliveryEmployeeEditForm);
app.post('/delivery-employees/edit/:id', checkDeliveryEmployeeExists(), postDeliveryEmployeeEditForm);