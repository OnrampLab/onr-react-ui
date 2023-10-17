import { Card, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react';
import { Todo } from '../definitions';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;

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
        return <Link href={`/todos/${todo.id}`}>{todo.title}</Link>;
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
        <Table dataSource={todos} columns={columns} pagination={} />
      </Card>
    </>
  );
};
