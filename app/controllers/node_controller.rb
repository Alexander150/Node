class NodeController < ApplicationController
  def index
  	@first_node = Node.first
  end

  def show
  	  @node = Node.find(params[:id])
  	  # edges = @node.edges
  end
end
