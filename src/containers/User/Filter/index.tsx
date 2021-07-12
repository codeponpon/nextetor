import React, { Component, createRef } from "react";
import {
  Button,
  Row,
  Col,
  DatePicker,
  Form,
  Input,
  Cascader,
  FormInstance,
} from "antd";
import moment from "moment";
import FilterItem from "@/components/FilterItem";

export interface iFilterProps {
  filter: { name?: string; createTime?: moment.Moment[] | string[] };
  onAdd: () => void;
  onFilterChange: (v: {
    name?: string;
    createTime?: moment.Moment[] | string[];
  }) => void;
}

const { Search } = Input;
const { RangePicker } = DatePicker;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const TwoColProps = {
  ...ColProps,
  xl: 96,
};

const Filter: React.FC<iFilterProps> = ({ filter, onAdd, onFilterChange }) => {
  const formRef = createRef<FormInstance>();

  const handleFields = (fields: { createTime: moment.Moment[] | string[] }) => {
    const { createTime } = fields;
    if (createTime && createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format("YYYY-MM-DD"),
        moment(createTime[1]).format("YYYY-MM-DD"),
      ];
    }
    return fields;
  };

  const handleSubmit = () => {
    const values = formRef.current!.getFieldsValue();
    const fields = handleFields(values);
    onFilterChange(fields);
  };

  const handleReset = () => {
    const fields = formRef.current!.getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    formRef.current!.setFieldsValue(fields);
    handleSubmit();
  };

  const { name, createTime } = filter;
  let initialCreateTime: moment.Moment[] = [];
  if (createTime && createTime[0]) {
    initialCreateTime[0] = moment(createTime[0]);
  }
  if (createTime && createTime[1]) {
    initialCreateTime[1] = moment(createTime[1]);
  }

  return (
    <Form
      ref={formRef}
      name="control-ref"
      initialValues={{ name, createTime: initialCreateTime }}
    >
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
          <Form.Item name="name">
            <Search
              placeholder={`Search Username, First Name and Last Name`}
              onSearch={handleSubmit}
            />
          </Form.Item>
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 8 }}
          md={{ span: 8 }}
          sm={{ span: 12 }}
          id="createTimeRangePicker"
        >
          <FilterItem label={`CreateTime`}>
            <Form.Item name="createTime">
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </FilterItem>
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="margin-right"
                onClick={handleSubmit}
              >
                Search
              </Button>
              <Button onClick={handleReset}>Reset</Button>
            </div>
            <Button type="ghost" onClick={onAdd}>
              Create
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
