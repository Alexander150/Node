class AddLastNodeToNode < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :last_node, :boolean
  end
end
