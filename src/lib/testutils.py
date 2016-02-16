from unittest import TestCase


class CustomTestCase(TestCase):
    def assert_fields_required(self, required, form, list_fields):
        """
        Check if a list of fields and required or not required in a form.

        :param required: True|False
        :param form: form to be checked
        :param list_fields: list of fields to check
        """
        for field in list_fields:
            if required:
                self.assertTrue(form.fields[field].required, 'FIELD:%s' % field)
            else:
                self.assertFalse(form.fields[field].required, 'FIELD:%s' % field)

    def assert_invalid_data(self, form, invalid_data_dicts):
        """
        Check invalid data errors in a form.

        :param form:
        :param invalid_data_dicts:
        :return:
        """
        for invalid_dict in invalid_data_dicts:
            form_data = form(data=invalid_dict['data'])
            self.assertFalse(form_data.is_valid())
            self.assertEqual(form_data.errors[invalid_dict['error'][0]], invalid_dict['error'][1],
                             msg=invalid_dict['label'])

    def assert_valid_data(self, form, valid_data_dicts):
        """
        Check valid data in a form.

        :param form:
        :param valid_data_dicts:
        :return:
        """
        for valid_data in valid_data_dicts:
            form_data = form(data=valid_data)
            self.assertTrue(form_data.is_valid)

    def assert_invalid_data_response(self, url, invalid_data_dicts):
        """
        Check invalid data response status.

        :param url:
        :param invalid_data_dicts:
        :return:
        """
        for invalid_dict in invalid_data_dicts:
            if invalid_dict['method'] == 'POST':
                response = self.client.post(url, data=invalid_dict['data'], format='json')
            elif invalid_dict['method'] == 'GET':
                response = self.client.get(url, data=invalid_dict['data'], format='json')
            else:
                print('Implement other methods.')  # pragma: no cover
            error_msg = '{}-{}-{}'.format(invalid_dict['label'], response.status_code, response.content)
            self.assertEqual(response.status_code, invalid_dict['status'], msg=error_msg)
