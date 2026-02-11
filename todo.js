let editingEvent = null; // Store reference to the event being edited

function addTask() {
    let name = document.getElementById("event-name").value.trim();
    let cname = document.getElementById("client-name").value;
    let date = document.getElementById("event-date").value;
    let time = document.getElementById("event-time").value;
    let location = document.getElementById("event-loc").value.trim();

    if (name && cname && date && time && location) {
        let group = document.getElementById(name.toLowerCase()); // Group events under same name

        if (!group) {
            // Create a new group if it doesn't exist
            group = document.createElement("div");
            group.id = name.toLowerCase();
            group.innerHTML = `<h3>${name} Events</h3><ul></ul>`;
            document.getElementById("event-groups").appendChild(group);
        }

        let ul = group.querySelector("ul");

        if (editingEvent) {
            // Update the existing event
            editingEvent.innerHTML = `${cname},${date} at ${time}, Location: ${location}   
            <span class="event-buttons">
        <button onclick="editEvent(this)">Edit</button>  
        <button onclick="deleteEvent(this)">Delete</button>
            </span>`;
            editingEvent = null; // Reset editing mode
            document.getElementById("submit-btn").textContent = "Add Event";
        } else {
            // Add new event under the existing group
            let li = document.createElement("li");
            li.innerHTML = `${cname},${date} at ${time}, Location: ${location}  
                <button onclick="editEvent(this)">Edit</button>  
                <button onclick="deleteEvent(this)">Delete</button>`;
            ul.appendChild(li);
        }

        // Clear form fields
        document.getElementById("event-name").value = "";
        document.getElementById("client-name").value = "";
        document.getElementById("event-date").value = "";
        document.getElementById("event-time").value = "";
        document.getElementById("event-loc").value = "";
    } else {
        alert("Please fill in all fields.");
    }

    return false; // Prevent form submission
}

function editEvent(button) {
    let li = button.parentElement;

    // Extract event details
    let details = li.innerHTML.split("<button")[0].trim();

    // Extract client name
    let parts = details.split(",");
    let cname = parts[0].trim(); // First part before ',' is client name
    
    // Extract event details from the remaining part
    let eventDetails = parts.slice(1).join(",").trim(); // Join back remaining parts
    let eventParts = eventDetails.match(/(.+) at (.+), Location: (.+)/);

    if (!eventParts) {
        console.error("Error parsing event details.");
        return;
    }

    let date = eventParts[1].trim();
    let time = eventParts[2].trim();
    let location = eventParts[3].trim();

    // Get event name from the parent group
    let eventGroup = li.closest("div");
    let eventName = eventGroup ? eventGroup.querySelector("h3").textContent.replace(" Events", "").trim() : "";

    // Set values back to the form
    document.getElementById("event-name").value = eventName;  // Name stays fixed
    document.getElementById("client-name").value = cname; // Now editable
    document.getElementById("event-date").value = date;
    document.getElementById("event-time").value = time;
    document.getElementById("event-loc").value = location;

    // Store reference to the event being edited
    editingEvent = li;

    // Change button text to "Update Event"
    document.getElementById("submit-btn").textContent = "Update Event";
}


function deleteEvent(button) {
    let li = button.parentElement;
    let ul = li.parentElement;
    li.remove();

    // If the group is empty after deletion, remove the group
    if (ul.children.length === 0) {
        ul.parentElement.remove();
    }
}
