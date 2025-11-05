// Mock Users Data - 20 users from PostgreSQL

export interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  role?: string;
  avatar?: string;
}

export const mockUsers: User[] = [
  { id: 1, name: "Albert Tross", email: "albert@swifttech.com", department: "Engineering" },
  { id: 2, name: "Owen Authora", email: "owen@swifttech.com", department: "Engineering" },
  { id: 3, name: "Capt. Trunk", email: "trunk@swifttech.com", department: "Engineering" },
  { id: 4, name: "Theodore T.C. Calvin", email: "calvin@swifttech.com", department: "Marketing" },
  { id: 5, name: "Don Draper", email: "don@swifttech.com", department: "Marketing" },
  { id: 6, name: "Sarah Connor", email: "sarah@swifttech.com", department: "Sales" },
  { id: 7, name: "John McClane", email: "john@swifttech.com", department: "Finance" },
  { id: 8, name: "Leslie Knope", email: "leslie@swifttech.com", department: "HR" },
  { id: 9, name: "Ada Lovelace", email: "ada@swifttech.com", department: "Engineering" },
  { id: 10, name: "Alan Turing", email: "alan@swifttech.com", department: "Engineering" },
  { id: 11, name: "Hannibal Smith", email: "hannibal@swifttech.com", department: "Marketing" },
  { id: 12, name: "Jordan Belfort", email: "jordan@swifttech.com", department: "Sales" },
  { id: 13, name: "Lisbeth Salander", email: "lisbeth@swifttech.com", department: "Engineering" },
  { id: 14, name: "Sherlock Holmes", email: "sherlock@swifttech.com", department: "Finance" },
  { id: 15, name: "Grace Hopper", email: "grace@swifttech.com", department: "Engineering" },
  { id: 16, name: "Tony Stark", email: "tony@swifttech.com", department: "Engineering" },
  { id: 17, name: "Leslie Knope", email: "leslie2@swifttech.com", department: "Customer Success" },
  { id: 18, name: "Michael Scott", email: "michael@swifttech.com", department: "Sales" },
  { id: 19, name: "Bruce Wayne", email: "bruce@swifttech.com", department: "Finance" },
  { id: 20, name: "Diana Prince", email: "diana@swifttech.com", department: "Engineering" },
];

export const getUserById = (id: number): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUsersByDepartment = (department: string): User[] => {
  return mockUsers.filter(user => user.department === department);
};
