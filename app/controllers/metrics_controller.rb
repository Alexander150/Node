class MetricsController < ApplicationController
	def create
		@metric = Metric.new(metric_params)
		@metric.save! 

		@metric_value = MetricValue.new(metrics_id: @metric.id, value: params.require(:metric_value))
		@metric_value.save!
	end
	private
		def metric_params
			params.require(:metric).permit(:name, :type_metric)
		end
end