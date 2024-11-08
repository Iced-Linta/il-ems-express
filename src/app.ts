import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

import { percentageFilter } from "./filter/PercentageFilter";
import { currencyFilter } from "./filter/CurrencyFilter";
import { getSalesEmployeeCreateForm, getSalesEmployeeDeleteForm, getSalesEmployeeDetail, getSalesEmployeeEditForm, getSalesEmployeeList, postSalesEmployeeCreateForm, postSalesEmployeeDeleteForm, postSalesEmployeeEditForm } from "./controllers/SalesEmployeeController";
import { checkSalesEmployeeExists } from "./middleware/CheckSalesEmployeeExistsMiddleware";
import { getLoginForm, getRegisterForm, postLoginForm, postRegisterForm } from "./controllers/AuthController";
import { allowRoles } from "./middleware/AuthMiddleware";
import { UserRole } from "./models/JwtToken";

import { getDeliveryEmployeeCreateForm, getDeliveryEmployeeDeleteForm, getDeliveryEmployeeDetail, getDeliveryEmployeeEditForm, getDeliveryEmployeeList, postDeliveryEmployeeCreateForm, postDeliveryEmployeeDeleteForm, postDeliveryEmployeeEditForm } from "./controllers/DeliveryEmployeeController";
import { checkDeliveryEmployeeExists } from "./middleware/CheckDeliveryEmployeeExistsMiddleware";
import { checkClientExists } from "./middleware/CheckClientExistsMiddleware";
import { getClientCreateForm, getClientDeleteForm, getClientDetail, getClientEditForm, getClientList, postClientCreateForm, postClientDeleteForm, postClientEditForm } from "./controllers/ClientController";

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

app.get('/', function(req, res){ res.render('index.njk'); });

app.get('/login', getLoginForm);
app.post('/login', postLoginForm);
app.get('/register', getRegisterForm);
app.post('/register', postRegisterForm);

app.use(allowRoles([UserRole.User, UserRole.HR, UserRole.Sales, UserRole.Management]));

app.get('/sales-employees', allowRoles([UserRole.HR]), getSalesEmployeeList);
app.get('/sales-employees/create', allowRoles([UserRole.HR]), getSalesEmployeeCreateForm);
app.post('/sales-employees/create', allowRoles([UserRole.HR]), postSalesEmployeeCreateForm);
app.get('/sales-employees/:id', allowRoles([UserRole.HR]), checkSalesEmployeeExists(), getSalesEmployeeDetail);
app.get('/sales-employees/delete/:id', allowRoles([UserRole.HR]), checkSalesEmployeeExists(), getSalesEmployeeDeleteForm);
app.post('/sales-employees/delete/:id', allowRoles([UserRole.HR]), checkSalesEmployeeExists(), postSalesEmployeeDeleteForm);
app.get('/sales-employees/edit/:id', allowRoles([UserRole.HR]), checkSalesEmployeeExists(), getSalesEmployeeEditForm);
app.post('/sales-employees/edit/:id', allowRoles([UserRole.HR]), checkSalesEmployeeExists(), postSalesEmployeeEditForm);

app.get('/delivery-employees', allowRoles([UserRole.HR]), getDeliveryEmployeeList);
app.get('/delivery-employees/create', allowRoles([UserRole.HR]), getDeliveryEmployeeCreateForm);
app.post('/delivery-employees/create', allowRoles([UserRole.HR]), postDeliveryEmployeeCreateForm);
app.get('/delivery-employees/:id', allowRoles([UserRole.HR]), checkDeliveryEmployeeExists(), getDeliveryEmployeeDetail);
app.get('/delivery-employees/delete/:id', allowRoles([UserRole.HR]), checkDeliveryEmployeeExists(), getDeliveryEmployeeDeleteForm);
app.post('/delivery-employees/delete/:id', allowRoles([UserRole.HR]), checkDeliveryEmployeeExists(), postDeliveryEmployeeDeleteForm);
app.get('/delivery-employees/edit/:id', allowRoles([UserRole.HR]), checkDeliveryEmployeeExists(), getDeliveryEmployeeEditForm);
app.post('/delivery-employees/edit/:id', allowRoles([UserRole.HR]), checkDeliveryEmployeeExists(), postDeliveryEmployeeEditForm);

app.get('/client', allowRoles([UserRole.Sales]), getClientList);
app.get('/client/create', allowRoles([UserRole.Sales]), getClientCreateForm);
app.post('/client/create', allowRoles([UserRole.Sales]), postClientCreateForm);
app.get('/client/:id', allowRoles([UserRole.Sales]), checkClientExists(), getClientDetail);
app.get('/client/delete/:id', allowRoles([UserRole.Sales]), checkClientExists(), getClientDeleteForm);
app.post('/client/delete/:id', allowRoles([UserRole.Sales]), checkClientExists(), postClientDeleteForm);
app.get('/client/edit/:id', allowRoles([UserRole.Sales]), checkClientExists(), getClientEditForm);
app.post('/client/edit/:id', allowRoles([UserRole.Sales]), checkClientExists(), postClientEditForm);

app.get('*', function(req, res){ res.render('error/404.njk'); });
