export let mockedLists: {
  id: number;
  name: string;
  description: string;
  author: string;
  date: string;
  deadline: string;
  image: string;
  public: number;
  items: { name: string; deadline: string; completed: boolean }[];
}[];
mockedLists = [
  {
    id: 0,
    name: 'To Do',
    description: 'Some description for name',
    author: 'manuelosorio',
    date: '4-27-2020',
    deadline: '12-02-2020',
    image: '',
    public: 1,
    items: [
      {
        name: 'Item 1',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 2',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 3',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 4',
        deadline: '12-02-2020',
        completed: false,
      },
    ],
  },
  {
    id: 1,
    name: 'To Do 2',
    description: 'Some description for name',
    author: 'manuelosorio',
    date: '4-27-2020',
    deadline: '12-02-2020',
    image: '',
    public: 1,
    items: [
      {
        name: 'Item 1',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 2',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 3',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 4',
        deadline: '12-02-2020',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: 'To Do 3',
    description: 'Some description for name',
    author: 'jdoe',
    date: '4-27-2020',
    deadline: '12-02-2020',
    image: '',
    public: 1,
    items: [
      {
        name: 'Item 1',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 2',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 3',
        deadline: '12-02-2020',
        completed: false,
      },
      {
        name: 'Item 4',
        deadline: '12-02-2020',
        completed: false,
      },
    ],
  },
];

export let mockedUsers: {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
  admin: number;
  deactivate: number;
}[];

mockedUsers = [];
