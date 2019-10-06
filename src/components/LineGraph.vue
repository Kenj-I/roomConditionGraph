<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    data: {
      required: true,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>
