package com.stangorlini.web

import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.widget.RemoteViewsService
import org.json.JSONArray
import java.text.SimpleDateFormat
import java.util.Locale

class FavoritesWidgetService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory {
        return FavoritesWidgetFactory(this.applicationContext)
    }
}

private fun getStatusColor(statusName: String): Int {
    val text = statusName.lowercase().trim()
    val colorStr = when {
        text.contains("completa") -> "#0f9d58"
        text.contains("testar") -> "#f4b400"
        text.contains("descartada") -> "#db4437"
        text.contains("progresso") -> "#4285f4"
        text.contains("iniciada") -> "#E0E0E0"
        text.contains("rascunho") -> "#8E8E8E"
        else -> "#FFCC00"
    }
    return android.graphics.Color.parseColor(colorStr)
}

class FavoritesWidgetFactory(private val context: Context) : RemoteViewsService.RemoteViewsFactory {
    private var tasksArray = JSONArray()

    override fun onCreate() {
        loadData()
    }

    override fun onDataSetChanged() {
        loadData()
    }

    private fun loadData() {
        val prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE)
        val tasksJson = prefs.getString("favorite_tasks", "[]")
        val selectedDim = prefs.getString("widget_filter_dimension", "") ?: ""
        
        try {
            val allTasks = JSONArray(tasksJson)
            val filteredList = mutableListOf<org.json.JSONObject>()
            for (i in 0 until allTasks.length()) {
                val task = allTasks.getJSONObject(i)
                if (selectedDim.isEmpty() || selectedDim == "Todas as Dimensões") {
                    filteredList.add(task)
                } else if (selectedDim == "Favoritas") {
                    if (task.optBoolean("is_favorite", false)) {
                        filteredList.add(task)
                    }
                } else {
                    if (task.optString("dimensao", "") == selectedDim) {
                        filteredList.add(task)
                    }
                }
            }
            
            // Sort by deadline (closest/overdue first)
            val sdf = java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", java.util.Locale.getDefault())
            sdf.timeZone = java.util.TimeZone.getTimeZone("UTC")
            filteredList.sortWith(Comparator { t1, t2 ->
                val p1 = t1.optString("prazo", "")
                val p2 = t2.optString("prazo", "")
                if (p1.isEmpty() && p2.isEmpty()) return@Comparator 0
                if (p1.isEmpty()) return@Comparator 1
                if (p2.isEmpty()) return@Comparator -1
                
                try {
                    val d1 = sdf.parse(p1)?.time ?: Long.MAX_VALUE
                    val d2 = sdf.parse(p2)?.time ?: Long.MAX_VALUE
                    d1.compareTo(d2)
                } catch(e: Exception) {
                    0
                }
            })

            tasksArray = JSONArray()
            filteredList.forEach { tasksArray.put(it) }
        } catch (e: Exception) {
            e.printStackTrace()
            tasksArray = JSONArray()
        }
    }

    override fun onDestroy() {}
    override fun getCount(): Int = tasksArray.length()

    override fun getViewAt(position: Int): RemoteViews {
        val views = RemoteViews(context.packageName, R.layout.widget_favorites_item)
        
        try {
            val task = tasksArray.getJSONObject(position)
            val name = task.optString("nome", "Sem título")
            val prazo = task.optString("prazo", "")
            
            views.setTextViewText(R.id.task_name, name)
            
            if (prazo.isNotEmpty() && prazo != "null") {
                try {
                    val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
                    sdf.timeZone = java.util.TimeZone.getTimeZone("UTC")
                    val date = sdf.parse(prazo)
                    if (date != null) {
                        val today = java.util.Calendar.getInstance()
                        val concluidaEmStr = task.optString("concluida_em", "")
                        val statusStr = task.optString("status", "").lowercase(Locale.getDefault())
                        if (statusStr.contains("completa") && concluidaEmStr.isNotEmpty() && concluidaEmStr != "null") {
                            try {
                                val cDate = sdf.parse(concluidaEmStr)
                                if (cDate != null) today.time = cDate
                            } catch (e: Exception) {}
                        }
                        
                        today.set(java.util.Calendar.HOUR_OF_DAY, 0)
                        today.set(java.util.Calendar.MINUTE, 0)
                        today.set(java.util.Calendar.SECOND, 0)
                        today.set(java.util.Calendar.MILLISECOND, 0)
                        
                        val target = java.util.Calendar.getInstance()
                        target.time = date
                        target.set(java.util.Calendar.HOUR_OF_DAY, 0)
                        target.set(java.util.Calendar.MINUTE, 0)
                        target.set(java.util.Calendar.SECOND, 0)
                        target.set(java.util.Calendar.MILLISECOND, 0)
                        
                        val diffMillis = target.timeInMillis - today.timeInMillis
                        val diffDays = java.util.concurrent.TimeUnit.MILLISECONDS.toDays(diffMillis)
                        
                        val dateText = when {
                            diffDays == 0L -> "Hoje"
                            else -> "${diffDays}d"
                        }
                        
                        views.setTextViewText(R.id.task_date, dateText)
                        
                        val textColor = when {
                            diffDays < 0L -> "#FF4444"
                            else -> "#FFCC00"
                        }
                        views.setTextColor(R.id.task_date, android.graphics.Color.parseColor(textColor))
                        
                        val status = task.optString("status", "")
                        views.setInt(R.id.task_status, "setColorFilter", getStatusColor(status))
                    }
                } catch (e: Exception) {
                    views.setTextViewText(R.id.task_date, "")
                }
            } else {
                views.setTextViewText(R.id.task_date, "")
            }

            // Fill-in Intent for status click
            val fillInIntent = Intent().apply {
                putExtra("action", "change_status")
                putExtra("taskId", task.optString("id", ""))
            }
            views.setOnClickFillInIntent(R.id.task_status, fillInIntent)
            
            // To allow general item clicks if needed (optional)
            val fillInIntent2 = Intent().apply {
                putExtra("action", "open_task")
                putExtra("taskId", task.optString("id", ""))
            }
            views.setOnClickFillInIntent(R.id.widget_item_container, fillInIntent2)
            
        } catch (e: Exception) {
            e.printStackTrace()
        }
        
        return views
    }

    override fun getLoadingView(): RemoteViews? = null
    override fun getViewTypeCount(): Int = 1
    override fun getItemId(position: Int): Long = position.toLong()
    override fun hasStableIds(): Boolean = true
}
