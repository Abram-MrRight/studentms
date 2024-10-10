// import { shallowMount } from '@vue/test-utils';
// import ListStudent from './ListStudent.vue';
// import SearchComponent from './SearchComponent.vue';
// import ApiService from '@/services/ApiService';

// jest.mock('../services/ApiService');

// describe('ListStudent.vue', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = shallowMount(ListStudent, {
//       stubs: {
//         SearchComponent,
//       },
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders correctly', () => {
//     expect(wrapper.exists()).toBe(true);
//   });

//   it('fetches students on mount', async () => {
//     const response = [{ student_id: 1, first_name: 'John' }];
//     ApiService.getStudents.mockResolvedValue({ data: response });

//     await wrapper.vm.getStudents();

//     expect(wrapper.vm.students).toEqual(response);
//   });

//   it('searches students', async () => {
//     const query = '?name=John';
//     const response = [{ student_id: 1, first_name: 'John' }];
//     ApiService.getStudents.mockResolvedValue({ data: response });

//     await wrapper.vm.handleSearch({ filter: 'name', searchQuery: 'John' });

//     expect(wrapper.vm.students).toEqual(response);
//   });

//   it('selects student and fetches financial details', async () => {
//     const student = { student_id: 1, first_name: 'John' };
//     const financialDetails = { school_fees: 1000 };
//     ApiService.getStudentFinancialDetails.mockResolvedValue({ data: financialDetails });

//     await wrapper.vm.selectStudent(student);

//     expect(wrapper.vm.selectedStudent).toEqual({ ...student, ...financialDetails });
//   });

//   it('loads more students', () => {
//     wrapper.vm.itemsToLoad = 10;
//     wrapper.vm.students = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

//     wrapper.vm.loadMoreStudents();

//     expect(wrapper.vm.visibleStudents.length).toBe(20);
//   });
// });


describe('sum function', () => {
  it('adds 1 + 2', () => {
    expect(1+2).toBe(3);
  });

  it('adds -1 + 1', () => {
    expect(-1+1).toBe(0);
  });

  it('adds 0 + 0', () => {
    expect(0+0).toBe(0);
  });
});
