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

$route['loan/all-loans'] = 'microfinance/loans/index';
$route['loan/add-loan'] = 'microfinance/loans/new_loan';
$route['loan/bulk_registration'] = 'microfinance/loans/bulk_registration';
$route['loan/edit/(:num)'] = 'microfinance/loans/edit/$1';
$route['loan/deactivate/(:num)'] = 'microfinance/loans/deactivate/$1';
$route['loan/activate/(:num)'] = 'microfinance/loans/activate/$1';
$route['loan/delete/(:num)'] = 'microfinance/loans/delete/$1';


/****
 * Loan Types Routes
****/

$route['loan-types/add-loan-types'] = 'microfinance/loan_types/add_loan_type';
$route['loan-types/import-loan-types'] = 'microfinance/loan_types/bulk_upload_view';
$route['loan-types/all-loan-types'] = 'microfinance/loan_types/index';
$route['loan-types/all-loan-types/(:any)/(:any)/(:num)'] = 'microfinance/loan_types/index/$1/$2/$3';
$route['loan-types/all-loan-types/(:any)/(:any)'] = 'microfinance/loan_types/index/$1/$2';
$route['loan-types/all-loan-types/(:num)'] = 'microfinance/loan_types/index/$1';
$route['loan-types/edit-loan-types/(:num)'] = 'microfinance/loan_types/edit_loan_type/$1';
$route['loan-types/activate-loan-types/(:num)'] = 'microfinance/loan_types/activate_loan_type/$1';
$route['loan-types/deactivate-loan-types/(:num)'] = 'microfinance/loan_types/deactivate_loan_type/$1';
$route['loan-types/delete-loan-types/(:num)'] = 'microfinance/loan_types/delete_loan_type/$1';
$route['loan-types/search-loan-types'] = 'microfinance/loan_types/search_loan_type';
$route['loan-types/close-search-loan-types'] = 'microfinance/loan_types/close_search_git add session';

/****
 * Member Routes
****/

$route['members/all-members'] = 'microfinance/members/index';
$route['members/all-members/(:num)'] = 'microfinance/members/index/$1';
$route['members/all-members/(:any)/(:any)'] = 'microfinance/members/index/$1/$2';
$route['members/all-members/(:any)/(:any)/(:num)'] = 'microfinance/members/index/$1/$2/$3';
$route['members/new_member'] = 'microfinance/members/new_member';
$route['members/bulk_registration'] = 'microfinance/members/bulk_registration';
$route['members/edit/(:num)'] = 'microfinance/members/display_edit_form/$1';
$route['members/deactivate/(:num)'] = 'microfinance/members/deactivate/$1';
$route['members/activate/(:num)'] = 'microfinance/members/activate/$1';
$route['members/gitdelete/(:num)'] = 'microfinance/members/delete_member/$1';
$route['members/search-members'] = 'microfinance/members/search_member';
$route['members/close-search-members'] = 'microfinance/members/close_search_member_session';
//$route['members/check-member-existence/(:any)'] = 'microfinance/members/check_member_existence/$1';


$route['members/member-existence'] = 'microfinance/members/member_existence';
$route['members/check-member-existence/(:any)/(:any)'] = 'microfinance/members/check_member_existence/$1/$2';
$route['members/save-member-password/(:any)/(:any)/(:any)'] = 'microfinance/members/save_member_password/$1/$2/$3';
$route['members/check-member-phone/(:num)'] = 'microfinance/members/retrieve_phone/$1';
//$route['members/strip'] = 'microfinance/members/strip_number';


//saving_types routes
$route['saving-types/add-saving-type'] = 'microfinance/saving_types/new_saving_type';
$route['saving-types/all-saving-types'] = 'microfinance/saving_types/index';
$route['saving-types/all-saving-types/(:any)/(:any)/(:num)'] = 'microfinance/saving_types/index/$1/$2/$3';
$route['saving-types/all-saving-types/(:any)/(:any)'] = 'microfinance/saving_types/index/$1/$2';
$route['saving-types/all-saving-types/(:num)'] = 'microfinance/saving_types/index/$1';
//$route['loan-types/all-loan-types/(:any)'] = 'microfinance/loan_types/index/';
//$route['loan-types/all-loan-types'] = 'microfinance/loan_types/index';
$route['loan-types/(:any)/(:any)/(:num)'] = 'microfinance/loan_types/index/$1/$2/$3';
$route['saving-types/edit-saving-types/(:num)'] = 'microfinance/saving_types/edit_saving_type/$1';
$route['saving_types/delete-saving-type/(:num)'] = 'microfinance/saving_types/delete_saving_type/$1';
$route['saving-types/deactivate-saving-type/(:num)'] = 'microfinance/saving_types/deactivate_saving_type/$1';
$route['saving-types/activate-saving-type/(:num)'] = 'microfinance/saving_types/activate_saving_type/$1';
$route['saving-types/import-saving-types'] = 'microfinance/saving_types/bulk_registration';
$route['loan_types/new_loan_type'] = 'microfinance/loan_types/new_loan_type';
$route['loan_types/bulk_registration'] = 'microfinance/loan_types/bulk_registration';
$route['loan_types/edit/(:num)'] = 'microfinance/loan_types/edit/$1';

$route['loan_types/activate/(:num)'] = 'microfinance/loan_types/activate/$1';

$route['loan_types/execute_search'] = 'microfinance/loan_types/execute_search';