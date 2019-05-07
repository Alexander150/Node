class EdgesController < ApplicationController

	def show
		edge = Edge.find(params[:id])
		edge.metric_operations.each do |m_o|
			if "Число" == m_o.metric.type_metric 
				if '+' == m_o.name
					session[m_o.metric.name] += m_o.value
				end
				if '-' == m_o.name
					session[m_o.metric.name] -= m_o.value
				end 
			end
			if "Строка" == m_o.metric.type_metric 
				session[m_o.metric.name] += m_o.value.to_s
			end
		end

		redirect_to "/node/#{edge.target_node_id}"
	end
	
	def create
		@edge = Edge.new(edge_params)
		@edge.save
	end

	def update
		metric_name = params.require(:metric)
    	metric = Metric.find_by name: metric_name
    	metric_operation = MetricOperation.new(name: params.require(:metric_operation_name), value: params.require(:metric_operation_value), metric: metric, edge_id: params.require(:edge))
    	metric_operation.save!
	end

	private
		def edge_params
			params.require(:edge).permit(:node_id, :target_node_id)
		end
end