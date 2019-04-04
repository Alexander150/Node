class NodeController < ApplicationController
  def index
  	@first_node = Node.first
  end

  def show
  	  @node = Node.find(params[:id])
  	  metric_values = @node.metric_values
  	  @id = metric_values.ids
  	  # metrics.each do |e|
  	  # 	@id = e.id
  	  # end
  end
end
