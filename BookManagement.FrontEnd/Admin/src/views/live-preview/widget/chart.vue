<script setup>
import Layout from "@/layout/main-admin.vue";
import pageheader from "@/components/page-header.vue";
import {
  earningsChart,
  overviewChart,
} from "./data";
</script>

<template>
  <Layout>
    <pageheader title="Thống kê doanh thu" pageTitle="Widget" />

    <BRow>
      <BCol lg="6">
        <BCard no-body>
          <BCardHeader>
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Doanh thu</h5>
              <input
                type="date"
                class="form-control form-control-sm w-auto border-0 shadow-none2"
              />
            </div>
          </BCardHeader>
          <BCardBody>
            <div class="d-flex align-items-center mb-1">
              <h3 class="mb-0">4.283.000VNĐ<small class="text-muted">/+2.000.000VNĐ</small></h3>
              <span class="badge bg-light-success ms-2">51%</span>
            </div>
            <p>Số lượng đơn đặt hàng</p>
            <div id="customer-rate-graph"></div>
            <apexchart
              class="apex-charts"
              height="230"
              dir="ltr"
              :series="earningsChart.series"
              :options="earningsChart.chartOptions"
            ></apexchart>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
      <BCol lg="6">
        <BCard no-body>
          <BCardHeader class="d-flex align-items-center justify-content-between">
            <h5>Tổng quan</h5>
            <BDropdown
              variant="link-secondary"
              class="card-header-dropdown py-0"
              toggle-class="text-reset dropdown-btn arrow-none"
              menu-class="dropdown-menu-end"
              aria-haspopup="true"
              :offset="{ alignmentAxis: -160, crossAxis: 0, mainAxis: 0 }"
            >
              <template #button-content
                ><span class="text-muted"
                  ><i class="material-icons-two-tone f-18">more_vert</i></span
                >
              </template>
              <BDropdownItem>View</BDropdownItem>
              <BDropdownItem>Edit</BDropdownItem>
            </BDropdown>
          </BCardHeader>
          <BCardBody>
            <div
              class="d-sm-flex align-items-center justify-content-between flex-wrap gap-2"
            >
              <div class="d-flex align-items-center mb-2 mb-sm-0">
                <h3 class="mb-0 me-1">1.245.000VND</h3>
                <span class="badge bg-success"
                  ><i class="ti ti-arrow-narrow-up"></i> 2.6%</span
                >
              </div>
              <ul class="nav nav-pills analytics-tab" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="analytics-tab-1"
                    data-bs-toggle="tab"
                    data-bs-target="#analytics-tab-1-pane"
                    type="button"
                    role="tab"
                    aria-controls="analytics-tab-1-pane"
                    aria-selected="true"
                  >
                    Theo ngày
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="analytics-tab-2"
                    data-bs-toggle="tab"
                    data-bs-target="#analytics-tab-2-pane"
                    type="button"
                    role="tab"
                    aria-controls="analytics-tab-2-pane"
                    aria-selected="false"
                  >
                    Theo tháng
                  </button>
                </li>
              </ul>
            </div>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane show active"
                id="analytics-tab-1-pane"
                role="tabpanel"
                aria-labelledby="analytics-tab-1"
                tabindex="0"
              >
                <div id="overview-chart-1"></div>
                <apexchart
                  class="apex-charts"
                  height="230"
                  dir="ltr"
                  :series="overviewChart.series"
                  :options="overviewChart.chartOptions"
                ></apexchart>
              </div>
              <div
                class="tab-pane"
                id="analytics-tab-2-pane"
                role="tabpanel"
                aria-labelledby="analytics-tab-2"
                tabindex="0"
              >
                <div id="overview-chart-2"></div>
              </div>
            </div>
          </BCardBody>
        </BCard>
      </BCol>
  </Layout>
</template>
