<template>
  <div class="company-profile" v-if="company">
    <!-- Company Details Section -->
    <ProfileSection title="Company details" :fields="companyDetailsFields" :company="company" />
    
    <!-- Contact Details Section -->
    <ProfileSection title="Contact details" :fields="contactDetailsFields" :company="company" />

    <!-- Address Details Section -->
    <ProfileSection title="Address details" :fields="addressDetailsFields" :company="company" />

    <!-- Additional Company Details Section -->
    <ProfileSection title="Additional Company details" :fields="additionalCompanyDetailsFields" :company="company" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue';
  import ProfileSection from '@/components/ProfileSection.vue'; // Assuming there's a reusable section component
  import { CompanyModel } from '@/Models/CompanyModel';

  // Company object reference
  const company = ref({});

  // Fetch company details on component mount
  const companyModel = new CompanyModel();
  onBeforeMount(async () => {
    company.value = await companyModel.fetch();
  });

  // Fields definitions for each section
  const companyDetailsFields = [
    { label: 'Company name', model: 'company_name', placeholder: 'Airline Company' },
    { label: 'Legal entity name', model: 'legal_entity_name', placeholder: 'The Legal Entity' },
    { label: 'Tax number', model: 'tax_number', placeholder: 'Tax number' },
    { label: 'Company number', model: 'company_number', placeholder: 'Company number' },
    { label: 'AOC number', model: 'aoc_number', placeholder: 'AOC number' },
  ];

  const contactDetailsFields = [
    { label: 'Legal responsible person name', model: 'legal_responsible', placeholder: 'Legal responsible person name' },
    { label: 'Primary user position', model: 'primary_user_position', placeholder: 'Primary user position' },
    { label: 'Primary user email address', model: 'notification_email_address', placeholder: 'Primary user email address' },
    { label: 'Notification email address', model: 'notification_email_address', placeholder: 'Notification email address' },
    { label: 'Finance email address', model: 'finance_email_address', placeholder: 'Finance email address' },
    { label: 'Quality Contact', model: 'quality_contact', placeholder: 'Quality Contact' },
  ];

  const addressDetailsFields = [
    { label: 'Address Line 1', model: 'address_line1', placeholder: 'Address Line 1' },
    { label: 'Address Line 2', model: 'address_line2', placeholder: 'Address Line 2' },
    { label: 'Address Line 3', model: 'address_line3', placeholder: 'Address Line 3' },
    { label: 'City/Town', model: 'city', placeholder: 'City/Town' },
    { label: 'State/county', model: 'state_country', placeholder: 'State/county' },
    { label: 'Country', model: 'country_code', placeholder: 'Country' },
    { label: 'Zip/post code', model: 'zip_code', placeholder: 'Zip/post code' },
  ];

  const additionalCompanyDetailsFields = [
    { label: 'Company audit', model: 'company_audit_due', placeholder: 'Company audit' },
    { label: 'Company compliance document', model: 'company_compliance_document', placeholder: 'Company compliance document' },
    { label: 'VAT applicable', model: 'vat_applicable', type: 'checkbox' },
  ];
</script>

<style scoped>
  .company-profile {
    width: 100%;
  }

  .company-profile h2 {
    font-weight: 600;
    font-size: 0.875rem;
    color: rgba(27, 51, 71, 1);
    margin: 0 0 10px 0;
  }

  .company-profile__section {
    margin-bottom: 20px;
  }

  .company-profile__form {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid rgba(27, 51, 71, 0.1);
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
