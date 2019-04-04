class AddFirstNodeToNode < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :first_node, :boolean
  end
end
