class EdgesController < ApplicationController

	def show

		edge = Edge.find(params[:id])
		@metric_operations = edge.metric_operations
		edge.metric_operations.each do |m_o|
			if '+' == m_o.name
				session[m_o.metric.name] += m_o.value
			end
			if '-' == m_o.name
				session[m_o.metric.name] -= m_o.value
			end 
		end

		redirect_to "/node/#{edge.target_node_id}"
	end

end