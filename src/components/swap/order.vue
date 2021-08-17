<template>
  <div class="main">
    <Form :model="form" label-position="top">
      <FormItem label="Title">
        <Input v-model="form.input1"></Input>
      </FormItem>
      <FormItem label="Title name">
        <Input v-model="form.input2"></Input>
      </FormItem>
      <FormItem label="Aligned title">
        <Input v-model="form.input3"></Input>
      </FormItem>

      <FormItem label="Title">
        <Input v-model="form.input1"></Input>
      </FormItem>
      <FormItem label="Title name">
        <Input v-model="form.input2"></Input>
      </FormItem>
      <FormItem label="Aligned title">
        <Input v-model="form.input3"></Input>
      </FormItem>

      <FormItem label="Title">
        <Input v-model="form.input1"></Input>
      </FormItem>
      <FormItem label="Title name">
        <Input v-model="form.input2"></Input>
      </FormItem>
      <FormItem label="Aligned title">
        <Input v-model="form.input3"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<style lang="less" scoped>
.main {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        input1: "",
        input2: "",
        input3: "",
      },
    };
  },
  methods: {},
};
</script>