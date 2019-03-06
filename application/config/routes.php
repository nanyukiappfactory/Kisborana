<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'admin/admin';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


/****
 * Auth Routes
****/

$route['admin/login'] = 'auth/admin/login_admin';



/****
 * Loan Routes
****/

$route['loan'] = 'microfinance/loan/index';
$route['loan/new_loan'] = 'microfinance/loan/new_loan';
$route['loan/bulk_registration'] = 'microfinance/loan/bulk_registration';
$route['loan/edit/(:num)'] = 'microfinance/loan/edit/$1';
$route['loan/deactivate/(:num)'] = 'microfinance/loan/deactivate/$1';
$route['loan/activate/(:num)'] = 'microfinance/loan/activate/$1';
$route['loan/delete/(:num)'] = 'microfinance/loan/delete/$1';


/****
 * Loan Types Routes
****/



$route['loan-types/add-loan_type'] = 'microfinance/loan_types/new_loan_type';
$route['loan-types/import-loan-types'] = 'microfinance/loan_types/bulk_registration';
$route['loan-types/all-loan-types'] = 'microfinance/loan_types/index';
$route['loan-types/all-loan-types/(:any)/(:any)/(:num)'] = 'microfinance/loan_types/index/$1/$2/$3';
$route['loan-types/all-loan-types/(:any)/(:any)'] = 'microfinance/loan_types/index/$1/$2';
$route['loan-types/all-loan-types/(:num)'] = 'microfinance/loan_types/index/$1';
//$route['loan-types/all-loan-types/(:any)'] = 'microfinance/loan_types/index/';
//$route['loan-types/all-loan-types'] = 'microfinance/loan_types/index';
$route['loan-types/(:any)/(:any)/(:num)'] = 'microfinance/loan_types/index/$1/$2/$3';
$route['loan-types/edit-loan-types/(:num)'] = 'microfinance/loan_types/edit/$1';


$route['deactivate-loan-types/(:num)'] = 'microfinance/loan_types/deactivate/$1';
$route['activate-loan-types/(:num)'] = 'microfinance/loan_types/activate/$1';
$route['delete-loan-types/(:num)'] = 'microfinance/loan_types/delete/$1';
$route['search-loan-types'] = 'microfinance/loan_types/execute_search';

/****
 * Member Routes
****/

$route['members'] = 'microfinance/members/index';
$route['members/new_member'] = 'microfinance/members/new_member';
$route['members/bulk_registration'] = 'microfinance/members/bulk_registration';
$route['members/edit/(:num)'] = 'microfinance/members/display_edit_form/$1';
$route['members/deactivate/(:num)'] = 'microfinance/members/deactivate/$1';
$route['members/activate/(:num)'] = 'microfinance/members/activate/$1';
$route['members/gitdelete/(:num)'] = 'microfinance/members/delete_member/$1';
$route['members/execute_search'] = 'microfinance/members/execute_search';

//saving_types routes
$route['saving_types'] = 'microfinance/saving_types/index';
$route['loan_types/new_loan_type'] = 'microfinance/loan_types/new_loan_type';
$route['loan_types/bulk_registration'] = 'microfinance/loan_types/bulk_registration';
$route['loan_types/edit/(:num)'] = 'microfinance/loan_types/edit/$1';
$route['loan_types/deactivate/(:num)'] = 'microfinance/loan_types/deactivate/$1';
$route['loan_types/activate/(:num)'] = 'microfinance/loan_types/activate/$1';
$route['loan_types/delete/(:num)'] = 'microfinance/loan_types/delete/$1';
$route['loan_types/execute_search'] = 'microfinance/loan_types/execute_search';