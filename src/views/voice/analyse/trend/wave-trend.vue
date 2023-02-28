<!--
  * @Description: 声音管理列表
  * @Author:      Xucranger
  * @Date:        2023-02-06 03:36
-->
<template>
  <a-form class="smart-query-form">
    <a-row class="smart-query-form-row">


      <!--      选择设备-->
      <!--      <a-cascader-->
      <!--          label=""-->
      <!--          v-model:value="value"-->
      <!--          :options="options"-->
      <!--          expand-trigger="hover"-->
      <!--          placeholder="采样点名"-->
      <!--          class="smart-query-form-item"-->
      <!--      />-->
      <VCascader></VCascader>


      <!--选择声音-->
      <a-form-item label="采样频率" class="smart-query-form-item">
        <a-input style="width: 100px" v-model:value="queryForm.keywords"  />
      </a-form-item>

      <a-form-item label="采样点数" class="smart-query-form-item">
        <a-input style="width: 100px" v-model:value="queryForm.keywords" />
      </a-form-item>

      <a-form-item label="关键字" class="smart-query-form-item">
        <a-input style="width: 300px" v-model:value="queryForm.keywords" placeholder="工厂名称，上传人，设备名称，等..." />
      </a-form-item>

      <a-form-item label="发布时间" class="smart-query-form-item">
        <a-range-picker v-model:value="publishDate" @change="publishDateChange" style="width: 220px" />
      </a-form-item>

      <a-form-item class="smart-query-form-item smart-margin-left10">
        <a-button-group>
          <a-button type="primary" @click="onSearch">
            <template #icon>
              <SearchOutlined />
            </template>
            查询
          </a-button>
          <a-button @click="onReload">
            <template #icon>
              <ReloadOutlined />
            </template>
            重置
          </a-button>
        </a-button-group>
      </a-form-item>
    </a-row>
  </a-form>



  <a-row :gutter="[10, 10]">
    <a-col :span="24">
      <a-card size="small" :bordered="false">
                <a-row class="smart-table-btn-block">
                  <div class="smart-table-setting-block">
                    <TableOperator v-model="tableColumns" :tableId="TABLE_ID_CONST.BUSINESS.OA.NOTICE" :refresh="queryNoticeList" />
                  </div>
                </a-row>
        <a-table
            rowKey="voiceId"
            :columns="tableColumns"
            :dataSource="tableData"
            :scroll="{ x: 1500 }"
            :pagination="false"
            :loading="tableLoading"
            bordered
            size="small"
        >
          <template #bodyCell="{ column, record, text }">
            <template v-if="column.dataIndex === 'operation'">
              <div class="smart-table-operate">
                <a-button type="link" @click="checkWave(record.voiceId)" v-privilege="'notice:edit'">查看波形</a-button>
                <a-button type="link" @click="play(record.voiceId)" v-privilege="'notice:delete'" danger>播放</a-button>
              </div>
            </template>
          </template>
        </a-table>

        <div class="smart-query-table-page">
          <a-pagination
              showSizeChanger
              showQuickJumper
              show-less-items
              :pageSizeOptions="PAGE_SIZE_OPTIONS"
              :defaultPageSize="queryForm.pageSize"
              v-model:current="queryForm.pageNum"
              v-model:pageSize="queryForm.pageSize"
              :total="total"
              @change="queryNoticeList"
              @showSizeChange="queryNoticeList"
              :show-total="(total) => `共${total}条`"
          />
        </div>
      </a-card>
    </a-col>

    <a-col :span="24">
      <a-card size="small" :bordered="false" >
        <WaveForm/>
      </a-card>
    </a-col>
  </a-row>


</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '/@/constants/common-const';
import SmartBooleanSelect from '/@/components/framework/boolean-select/index.vue';
import VCascader from '/@/views/voice/manage/components/voice-manage-cascader.vue'
import { noticeApi } from '/@/api/business/oa/notice-api';
import { smartSentry } from '/@/lib/smart-sentry';
import { TABLE_ID_CONST } from '/@/constants/support/table-id-const';
import TableOperator from '/@/components/support/table-operator/index.vue';
import WaveForm from '/@/components/voice/voice-waveform/index.vue';


const tableColumns = reactive([
  {
    title: `声音名称`,
    dataIndex: 'voiceId',
    width: 300,
    ellipsis: true,
  },

  {
    title: `采样频率`,
    dataIndex: 'hz',
    width: 100,
    ellipsis: true,
  },
  {
    title: `采样点数`,
    dataIndex: 'smaplingNum',
    width: 90,
    ellipsis: true,
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    width: 140,
  },
  {
    title: `上传人`,
    dataIndex: 'uploader',
    width: 90,
    ellipsis: true,
  },
  {
    title: '用户操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: 90,
  },
]);

// ------------------ 通知分类 ------------------

// 查询分类列表
const noticeTypeList = ref([]);
async function queryNoticeTypeList() {
  try {
    const result = await noticeApi.getAllNoticeTypeList();
    noticeTypeList.value = result.data;
  } catch (err) {
    smartSentry.captureError(err);
  }
}

// ------------------ 查询相关 ------------------

const queryFormState = {
  noticeTypeId: undefined, //分类
  keywords: '', //标题、作者、来源
  publishTimeBegin: null, //发布-开始时间
  publishTimeEnd: null, //发布-截止时间
  notViewFlag: false, //未读
  pageNum: 1,
  pageSize: PAGE_SIZE,
};
const queryForm = reactive({ ...queryFormState });

const tableData = ref([]);
const total = ref(0);
const tableLoading = ref(false);

onMounted(() => {
  queryNoticeTypeList();
  queryNoticeList();
});

function changeNotViewFlag(value) {
  queryForm.notViewFlag = value === 0 ? null : true;
  onSearch();
}

// 查询列表
async function queryNoticeList() {
  try {
    tableLoading.value = true;
    const result = await noticeApi.queryEmployeeNotice(queryForm);
    tableData.value = result.data.list;
    total.value = result.data.total;
  } catch (err) {
    smartSentry.captureError(err);
  } finally {
    tableLoading.value = false;
  }
}

// 点击查询
function onSearch() {
  queryForm.pageNum = 1;
  queryNoticeList();
}

// 点击重置
function onReload() {
  Object.assign(queryForm, queryFormState);
  publishDate.value = [];
  createDate.value = [];
  queryNoticeList();
}

// 发布日期选择
const publishDate = ref([]);
function publishDateChange(dates, dateStrings) {
  queryForm.publishTimeBegin = dateStrings[0];
  queryForm.publishTimeEnd = dateStrings[1];
}
// 创建日期选择
const createDate = ref([]);
function createDateChange(dates, dateStrings) {
  queryForm.createTimeBegin = dateStrings[0];
  queryForm.createTimeEnd = dateStrings[1];
}

// ------------------ 详情 ------------------

// 进入详情
const router = useRouter();
function toDetail(noticeId) {
  router.push({
    path: '/oa/notice/notice-employee-detail',
    query: { noticeId },
  });
}
</script>

<style lang="less" scoped></style>
