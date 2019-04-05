class EdgesController < ApplicationController

	def show
		edge = Edge.find(params[:id])
		@metric_operations = edge.metric_operations
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
		# redirect_to "/node/#{@edge.target_node_id}"
	end

end