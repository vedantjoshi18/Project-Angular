import { Component } from '@angular/core';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
    feedbackModel = { title: '', description: '', email: '' };

    submitFeedback(form: any) {
        if (form.valid) {
            alert('Feedback submitted!');
            form.reset();
        }
    }
}
