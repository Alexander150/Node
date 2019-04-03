class CreateEdges < ActiveRecord::Migration[5.2]
  def change
    create_table :edges do |t|
      t.references :node, foreign_key: true
      t.string :name
      t.references :metric_operation, foreign_key: true

      t.timestamps
    end
  end
end
