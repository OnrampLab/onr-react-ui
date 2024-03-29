import { useCorePreference } from '@onr/core';
import { Card, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react';
import { Todo } from '../definitions';
import { getTodoConfig } from '../utils/getTodoConfig';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;
  const todoConfig = getTodoConfig();
  const { paginationPreference, setPaginationPreference } = useCorePreference();

  const columns: ColumnsType<Todo> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render(_, todo: Todo) {
        let { title } = todo;

        if (todoConfig.todoList.showIdOnTitle) {
          title = `${title} (ID: ${todo.id})`;
        }
        return <Link href={`/todos/${todo.id}`}>{title}</Link>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render(completed: boolean) {
        return completed ? 'Done' : 'Not Done';
      },
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: _ => (
        <Space size="middle">
          <a>Remove</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card title="Todo List">
        <Table
          rowKey="id"
          dataSource={todos}
          columns={columns}
          pagination={{
            pageSize: paginationPreference?.pageSize,
            onShowSizeChange(_, pageSize) {
              setPaginationPreference({
                ...paginationPreference,
                pageSize,
              });
            },
          }}
        />
      </Card>
    </>
  );
};
