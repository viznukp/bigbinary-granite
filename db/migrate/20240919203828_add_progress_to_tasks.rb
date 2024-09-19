# frozen_string_literal: true

class AddProgressToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :progress, :string, default: "pending", null: false
  end
end
