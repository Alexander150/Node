class MetricValue < ApplicationRecord
  belongs_to :metric, foreign_key: "metrics_id", class_name: "Metric"
end
