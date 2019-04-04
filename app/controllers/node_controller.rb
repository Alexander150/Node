class NodeController < ApplicationController
  def index
  	
  	@first_node = Node.first
  end

  def show
  	  @node = Node.find(params[:id])

  	  metric_value_id = @node.metric_value_id
  	  metric_value = MetricValue.find_by id: metric_value_id

  	  if true == @node.first_node
  	  	Metric.all.each do |m|
  	  		if "Число" == m.type_metric 
  				session[m.name] = metric_value.value
  			end
  			if "Строка" == m.type_metric
  				session[m.name] = "sdfghjkl"
  			end
  		end
  	  end 
  end
end
