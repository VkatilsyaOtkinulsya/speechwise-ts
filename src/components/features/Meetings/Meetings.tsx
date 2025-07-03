import { useEffect, useState } from 'react';
import {
  Table,
  Input,
  DatePicker,
  Button,
  Modal,
  Select,
  Form,
  message,
  Spin
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useMediaModalState } from '@/stores/mediaModalStore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import './Meetings.css';
import { useMeetings } from '@/hooks/useMeetings';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Meeting {
  id: number;
  date: string;
  title: string;
  status: string;
  duration: string;
  projectId: number | null;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: string;
}

const Meetings = () => {
  // const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [form] = Form.useForm();

  const { meetings, refetch, isLoading } = useMeetings();

  const openModal = useMediaModalState((state) => state.open);

  const handleAddMeetingClick = () => {
    openModal();
  };

  useEffect(() => {
    refetch();
    const projectsData: Project[] = [
      {
        id: 1,
        title: 'Проект 1',
        description: 'что-то на русском',
        technologies: ['наши технологии'],
        status: 'в процессе'
      }
    ];
    setProjects(projectsData);
  }, []);

  const getProjectTitle = (projectId: number | null) => {
    if (projectId === null) return 'Нет проекта';
    const project = projects.find((p) => p.id === projectId);
    return project ? project.title : 'Неизвестный проект';
  };

  const handleDelete = (id: number) => {
    // setMeetings(meetings.filter((meeting) => meeting.id !== id));
    message.success('Встреча удалена');
  };

  const handleEdit = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    form.setFieldsValue({
      title: meeting.title,
      projectId: meeting.projectId
    });
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingMeeting) {
          // setMeetings(
          //   meetings.map((meeting) =>
          //     meeting.id === editingMeeting.id
          //       ? { ...meeting, ...values }
          //       : meeting
          //   )
          // );
          setIsModalVisible(false);
          setEditingMeeting(null);
          form.resetFields();
          message.success('Встреча обновлена');
        }
      })
      .catch((info) => {
        console.log('Ошибка валидации:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingMeeting(null);
    form.resetFields();
  };

  const filteredMeetings = meetings.filter((meeting) => {
    const projectTitle = getProjectTitle(meeting.projectId).toLowerCase();
    const matchProject = projectTitle.includes(filter.toLowerCase());

    const meetingDate = dayjs(meeting.date, 'DD.MM.YYYY');
    const [start, end] = dateRange;

    const matchDate =
      !start ||
      !end ||
      (meetingDate.isSameOrAfter(start, 'day') &&
        meetingDate.isSameOrBefore(end, 'day'));

    return matchProject && matchDate;
  });

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    const dateA = dayjs(a.date, 'DD.MM.YYYY');
    const dateB = dayjs(b.date, 'DD.MM.YYYY');
    return dateB.valueOf() - dateA.valueOf();
  });

  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Название', dataIndex: 'title', key: 'title' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Длительность', dataIndex: 'duration', key: 'duration' },
    {
      title: 'Проект',
      dataIndex: 'projectId',
      key: 'projectId',
      render: (projectId: number | null) => getProjectTitle(projectId)
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (record: Meeting) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </div>
      )
    }
  ];

  const dataSource = meetings.map((meeting) => ({
    ...meeting,
    key: meeting.id
  }));

  return (
    <div className="projects-page">
      {isLoading && <Spin size="large" />}
      {!isLoading && (
        <>
          {' '}
          <div
            className="filter-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 16
            }}
          >
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Input
                placeholder="Фильтр по названию проекта..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ width: 250 }}
              />
              <RangePicker
                format="DD.MM.YYYY"
                locale={locale}
                style={{ width: 280 }}
                onChange={(range) => setDateRange(range as [Dayjs, Dayjs])}
              />
            </div>

            <button
              onClick={() => handleAddMeetingClick()}
              className="add-meeting-button"
            >
              <PlusOutlined />
              Добавить встречу
            </button>
          </div>
          <div className="table-wrapper">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={{ pageSize: 8 }}
            />
          </div>
          <Modal
            title="Редактирование встречи"
            open={isModalVisible}
            onOk={handleSave}
            onCancel={handleCancel}
            okText="Сохранить"
            cancelText="Отмена"
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="title"
                label="Название встречи"
                rules={[
                  { required: true, message: 'Пожалуйста, введите название!' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="projectId"
                label="Проект"
                rules={[
                  { required: true, message: 'Пожалуйста, выберите проект!' }
                ]}
              >
                <Select placeholder="Выберите проект">
                  <Option value={null}>Нет проекта</Option>
                  {projects.map((project) => (
                    <Option key={project.id} value={project.id}>
                      {project.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Meetings;
