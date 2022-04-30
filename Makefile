run:
	docker run -d -p 8080:8080 -v C:\\Works\\My_Project2\\work-time-tracking:/app -v /app/node_modules --rm --name worktime jakovchuk/worktime
run-nr:
	docker run -d -p 8080:8080 -v "C:\Works\My_Project2\work-time-tracking":/app -v /app/node_modules --rm --name worktime jakovchuk/worktime
stop:
	docker stop worktime
login:
	cat ./my_password.txt | docker login --username jakovchuk --password-stdin
