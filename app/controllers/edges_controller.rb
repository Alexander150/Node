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

# 	NodeController.params["value"].to_i
# NodeController.params["value"].to_i

end