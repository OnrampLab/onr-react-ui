import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import styled from 'styled-components';

const Style = styled.div`
  .inline-form-item {
    display: inline-block;
    margin-bottom: 5px;
  }
`;

type SearchPanelProps = {
  fieldDefinitions: any;
  initialFieldName: string;
  onSearch(filter: any): void;
};

export const SearchPanel: React.FC<SearchPanelProps> = ({
  onSearch,
  fieldDefinitions,
  initialFieldName,
}) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 22 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 24, offset: 0 },
    },
  };

  const allFilterOptions = fieldDefinitions.map((fieldDefinition: any) => ({
    label: fieldDefinition.label,
    value: fieldDefinition.name,
  }));

  const operatorOptions = [
    {
      label: 'With/In',
      value: 'in',
    },
  ];

  const getFilterOptions = (currentIndex: number) => {
    const fields = form.getFieldValue('fields') as any[];

    const usedFieldNames = fields
      .filter((_, index) => index !== currentIndex)
      .map(field => field?.name);

    const options = allFilterOptions.filter(
      (option: any) => !usedFieldNames.includes(option.value),
    );

    return options || [];
  };

  const onFinish = (values: any) => {
    console.log(values);

    const fields: [] = values.fields;

    const filter = fields.reduce((filter: any, field: any) => {
      filter[field.name] = field.value;

      return filter;
    }, {});

    onSearch(filter);
  };

  return (
    <Style>
      <Form
        style={{ marginBottom: 5, width: 800 }}
        form={form}
        initialValues={{ fields: [{ name: initialFieldName }] }}
        onFinish={onFinish}
      >
        <Form.List name="fields">
          {(fields, { add, remove }, { errors }) => (
            // NOTE: It's tricky that shouldUpdate only works when name field is not present.
            <Form.Item key={`form-list-wrapper`} shouldUpdate noStyle>
              {() => {
                const areAllFieldsUsed =
                  form.getFieldValue('fields')?.length === allFilterOptions?.length;

                return (
                  <>
                    {fields.map((field, index) => {
                      const fieldName = form.getFieldValue(['fields', index, 'name']);
                      const fieldDefinition: any = fieldDefinitions.find(
                        (field: any) => field.name === fieldName,
                      );

                      const onFieldChanged = () => {
                        form.resetFields([['fields', index, 'value']]);
                      };

                      return (
                        <div key={index}>
                          <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            key={`${field.key}-name`}
                            name={[field.name, 'name']}
                            className="inline-form-item "
                            style={{ minWidth: 150 }}
                          >
                            <Select
                              style={{ width: 150 }}
                              options={getFilterOptions(index)}
                              onChange={onFieldChanged}
                              defaultValue={null}
                            />
                          </Form.Item>
                          <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            key={`${field.key}-operation`}
                            className="inline-form-item "
                            style={{
                              minWidth: 150,
                              marginLeft: 5,
                            }}
                            name={[field.name, 'operation']}
                          >
                            <Select
                              style={{ width: 150 }}
                              options={operatorOptions}
                              defaultValue={'in'}
                            />
                          </Form.Item>
                          <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            key={`${field.key}-value`}
                            name={[field.name, 'value']}
                            className="inline-form-item "
                            style={{
                              width: 450,
                              marginLeft: 5,
                            }}
                          >
                            {fieldDefinition?.type === 'select' && (
                              <Select
                                mode="multiple"
                                allowClear
                                options={fieldDefinition.options}
                                style={{ width: 450 }}
                              />
                            )}
                            {(!fieldName || fieldDefinition?.type === 'text') && (
                              <Input style={{ width: 450 }} />
                            )}
                          </Form.Item>

                          {fields.length > 1 && index !== 0 ? (
                            <MinusCircleOutlined
                              rev={true}
                              style={{
                                position: 'relative',
                                top: 4,
                                margin: '0 8px',
                                color: '#999',
                                fontSize: 24,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                              }}
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                      }}
                    >
                      <Form.Item style={{ minWidth: 200 }}>
                        {!areAllFieldsUsed && (
                          <>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              icon={<PlusOutlined rev={true} />}
                            >
                              Add Filter
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </>
                        )}
                      </Form.Item>
                      <Form.Item style={{ marginRight: 40 }}>
                        <Button type="primary" htmlType="submit">
                          Search
                        </Button>
                      </Form.Item>
                    </div>
                  </>
                );
              }}
            </Form.Item>
          )}
        </Form.List>
      </Form>
    </Style>
  );
};
