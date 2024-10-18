<template>
  <div class="container mt-5 d-flex flex-column align-items-center">
    <!-- Success Alert -->
    <div v-if="showSuccessAlert" class="alert alert-success alert-dismissible fade show w-100" role="alert">
      Student added successfully!
      <button type="button" class="btn-close" aria-label="Close" @click="dismissAlert"></button>
    </div>

    <!-- Progress Indicator -->
    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <!-- Add Student Form -->
    <div class="d-flex justify-content-center w-50-md w-100">
      <div v-if="!showStudentDetails" class="m-4 w-100">
        <h2 class="mb-5">Add New Student</h2>
        <form @submit.prevent="addStudent">
          <!-- Form Fields -->
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="firstName" v-model="form.first_name" required>
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lastName" v-model="form.last_name" required>
          </div>
          <div class="mb-3">
            <label for="dateOfBirth" class="form-label">Date of Birth</label>
            <input type="date" class="form-control" id="dateOfBirth" v-model="form.date_of_birth" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Gender</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="male" value="M" v-model="form.gender" required>
                <label class="form-check-label" for="male">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="female" value="F" v-model="form.gender" required>
                <label class="form-check-label" for="female">Female</label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="parentsContact" class="form-label">Parents' Contact</label>
            <input type="tel" class="form-control" id="parentsContact" v-model="form.parents_contact" required>
          </div>
          <div class="mb-3">
            <label for="physicalAddress" class="form-label">Physical Address</label>
            <input type="text" class="form-control" id="physicalAddress" v-model="form.physical_address" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Category</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="day" value="Day" v-model="form.category" required>
                <label class="form-check-label" for="day">Day</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="boarding" value="Boarding" v-model="form.category" required>
                <label class="form-check-label" for="boarding">Boarding</label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="class" class="form-label">Class</label>
            <input type="text" class="form-control" id="class" v-model="form.class" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Status</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="active" value="true" v-model="form.status" required>
                <label class="form-check-label" for="active">Active</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="inactive" value="false" v-model="form.status" required>
                <label class="form-check-label" for="inactive">Inactive</label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="fees" class="form-label">School Fees</label>
            <input type="number" class="form-control" id="fees" v-model="form.school_fees" required>
          </div>
          <div class="mb-3">
            <label for="initialPayment" class="form-label">Initial Payment (Optional)</label>
            <input type="number" class="form-control" id="initialPayment" v-model="form.initial_payment">
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>

    <!-- Student Details -->
    <div class="d-flex justify-content-center w-50-md w-100" v-if="showStudentDetails">
      <div class="w-100">
        <h3>Student Details</h3>
        <p><strong>Name:</strong> {{ newStudent?.first_name }} {{ newStudent?.last_name }}</p>
        <p><strong>Date of Birth:</strong> {{ newStudent?.date_of_birth }}</p>
        <p><strong>Gender:</strong> {{ newStudent?.gender }}</p>
        <p><strong>Parents' Contact:</strong> {{ newStudent?.parents_contact }}</p>
        <p><strong>Physical Address:</strong> {{ newStudent?.physical_address }}</p>
        <p><strong>Category:</strong> {{ newStudent?.category }}</p>
        <p><strong>Class:</strong> {{ newStudent?.class }}</p>
        <p><strong>Status:</strong> {{ newStudent?.status ? 'Active' : 'Inactive' }}</p>
        <p><strong>Fees:</strong> UGX {{ (this.fees ?? 0).toLocaleString('en-US') }}</p>
        <p><strong>Initial Payment:</strong> UGX {{ (this.initial_payment ?? 0).toLocaleString('en-US') }}</p>
        <button class="btn btn-danger" @click="dismissStudentDetails">Dismiss</button>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiService from '../services/ApiService'
  import axios from 'axios'; // Import axios for logging

  export default {
    name: 'AddStudent',

    data() {
      return {
        form: {
          first_name: '',
          last_name: '',
          gender: 'M',
          date_of_birth: '2000-01-01',
          parents_contact: '+256',
          physical_address: '',
          category: 'Day',
          class: '',
          status: false,
          school_fees: 0,
          initial_payment: 0,
        },
        showSuccessAlert: false,
        showStudentDetails: false,
        newStudent: null,
        fees: 0,
        initial_payment: 0,
        loading: false,
      };
    },

    methods: {
      async addStudent() {
        this.loading = true;
        try {
          let data = this.form;
          if (this.form.initial_payment <= 0) {
            delete data.initial_payment;
          }
          const response = await ApiService.addStudent(data);
          this.newStudent = response.data;
          this.showSuccessAlert = true;
          this.showStudentDetails = true;
          this.fees = this.form.school_fees;
          this.initial_payment = this.form.initial_payment;
          this.resetForm();
        } catch (error) {
          console.error('Error adding student:', error);
          // Log error to backend
          this.logErrorToBackend(error);
        } finally {
          this.loading = false;
        }
      },

      dismissAlert() {
        this.showSuccessAlert = false;
      },

      dismissStudentDetails() {
        this.showStudentDetails = false;
        this.newStudent = null;
      },

      // New method for logging errors
      logErrorToBackend(error) {
        axios.post('http://localhost:3001/api/logs', { error }) // Adjust this URL to match your logging endpoint
          .then(response => {
            console.log('Logged error:', response.data);
          })
          .catch(err => {
            console.error('Failed to log error:', err);
          });
      },

      resetForm() {
        this.form = {
          first_name: '',
          last_name: '',
          gender: 'M',
          date_of_birth: '2000-01-01',
          parents_contact: '+256',
          physical_address: '',
          category: 'Day',
          class: '',
          status: false,
          school_fees: 0,
          initial_payment: 0,
        };
      },
    },
  };
</script>

<style scoped>
.alert {
  margin-top: 20px;
}

form {
  transition: all 0.5s ease-in-out;
}

.col-md-6.offset-md-6 {
  margin-left: auto;
}

.col-md-6 {
  transition: all 0.5s ease-in-out;
}

.container {
  width: 50%;
}

.spinner-border {
  margin-top: 20px;
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}
</style>
